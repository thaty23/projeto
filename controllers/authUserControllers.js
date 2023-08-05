const prisma = require('../dataBase/dataBase')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = class authUserControllers {
    static async login(request, response){
        const { email, senha } = request.body

        const emailCheck = await prisma.posto.findFirst({ where: { email } })
        if(!emailCheck) {
            return response.status(422).json({ message: "E-mail invalido" });
        }

        const senhaCheck = await bcrypt.compare(senha, emailCheck.senha)
        if(!senhaCheck) {
            return response.status(422).json({ message: "senha invalido" });
        }

        const posto = await prisma.posto.findFirst({ where: { email } })

        try {
            const token = jwt.sign( 
                {
                    id: posto.id, 
                    name: posto.name,
                    email: posto.email,
                    senha: posto.senha
                }, 
                process.env.SECRET,
                {
                    expiresIn: '30 days'
                }
            )
            return response.status(200).json({ message: 'usário logado', token })
        } catch (error) {
          
            return response.status(422).json({ message: 'erro ao logar', error })
        }

    }
}