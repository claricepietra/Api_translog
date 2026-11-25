const VeiculoView = require("../views/VeiculoView.js");
const VeiculoModel = require("../models/VeiculoModel.js");

class VeiculoController {
  static tratarErro(res, erro) {
    console.error("Erro em VeiculoController:", erro);

    if (erro.code === "ER_DUP_ENTRY" || erro.errno === 1062) {
      return res.status(409).json(
        VeiculoView.erro("Conflito (409): esse cd_placa já está cadastrado no sistema. !", 409)
      );
    }

    return res.status(500).json(
      VeiculoView.erro("Erro interno do servidor (500).", 500)
    );
  }

  static async listar(req, res) {
    try {
      const { ds_categoria } = req.query;
      const veiculos = await VeiculoModel.listarTodos(ds_categoria);

      return res.status(200).json(
        VeiculoView.sucesso("Registros de tb_produtos listados com sucesso.", veiculos, 200)
      );
    } catch (erro) {
      return VeiculoController.tratarErro(res, erro);
    }
  }

  static async buscarPorId(req, res) {
    try {
      const id_veiculo = parseInt(req.params.id, 10);

      if (isNaN(id_veiculo) || id_veiculo <= 0) {
        return res.status(400).json(
          VeiculoView.erro("Parâmetro id_produto inválido na URL", 400)
        );
      }

      const veiculo = await VeiculoModel.buscarPorId(id_veiculo);

      if (!veiculo) {
        return res.status(404).json(
          VeiculoView.erro(`Registro com id_produto ${id_veiculo} não encontrado`, 404)
        );
      }

      return res.status(200).json(
        VeiculoView.sucesso("Registro localizado com sucesso", veiculo, 200)
      );
    } catch (erro) {
      return VeiculoController.tratarErro(res, erro);
    }
  }
  


    static async cadastrar(req, res){
    try{
        const { cd_placa, nm_modelo, ds_categoria } = req.body;
        const valorDiariaFrete = req.body.vl_diaria_frete;
        const quilometragem = req.body.qt_quilometragem;
        if(!cd_placa || !nm_modelo || !ds_categoria){
            return res.status(400).json(VeiculoView .erro("Os campos cd_sku, nm_produto, ds_categoria são obrigatorios", 400));
        }

        const vl_diaria_frete = Number(valorDiariaFrete);
        const qt_quilometragem = quilometragem !== undefined ? parseInt(quilometragem, 10) : 0;

        if(isNaN(vl_diaria_frete) || vl_diaria_frete <= 0 || isNaN(qt_quilometragem) || qt_quilometragem < 0){
            return res.status(422).json(VeiculoView.erro("Erro 422: o vl_preco deve ser maior que zero e qt_estoque nao pode ser negativo.", 422));
        }

        const novoRegistro = await VeiculoModel.cadastrar({
            cd_placa: String(cd_placa).trim().toUpperCase(),
            nm_modelo: String(nm_modelo).trim(),
            ds_categoria: String(ds_categoria).trim(),
            vl_diaria_frete: vl_diaria_frete,
            qt_quilometragem: qt_quilometragem
        });

        return res.status(201).json(VeiculoView.sucesso("Registro cadastrado com sucesso", novoRegistro, 201));
    }catch(erro){
    
        return VeiculoController.tratarErro(res, erro);
    }
}
}
