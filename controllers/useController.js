const prisma = require('../dataBase/dataBase') //Importa o prisma para permitir acesso ao Bd
const encryptPass = require('../utils/encryptPass') //Módulo responsável por criptografar as senhas do usuário antes de ser armazenada no Bd

module.exports = class useController {
    static async createUser(request, response){
        const { name, email, senha, cpf, telefone, endereco, estado, bairro, cidade, unidade} = request.body

        try { 
          const encrypt = await encryptPass(senha)
          
          const user = await prisma.posto.create({
            data: {
                name,
                email,
                senha: encrypt,
                cpf,
                telefone,
                endereco,
                estado,
                bairro,
                cidade,
                unidade
            }
          })
          return response.status(200).json({ message: 'posto criado', user })
        } catch (error) {
          return response.status(422).json({ error })   
        }
    }

}
