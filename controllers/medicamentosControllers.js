const prisma = require('../dataBase/dataBase')
const jwt = require('jsonwebtoken')
const encryptPass = require('../utils/encryptPass')

module.exports = class medicamentosControllers {
    static async createMedicamentos(request, response){
        const { name, data, quantidade, descricao } = request.body

        const token = request.headers.authorization;

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET);

            const userId = decodedToken.id;

            if (!userId) {
                return response.status(401).send({ message: "Unauthorized. Please log in." });
            }

            const medicamentos = await prisma.medicamentos.create({  
                data: {
                    name,
                    data,
                    quantidade,
                    descricao,
                    postoId: userId
                }
            })
            return response.status(200).json({ message: 'medicamento criado', medicamentos })
        } catch (error) {
         
            return response.status(422).json({ message: 'error', error })
        }
    }

    static async getMedicamentos(request, response){              
        try {       
            const medicamentos = await prisma.medicamentos.findMany({  })
            return response.status(200).json({ message: 'medicamento encontrado', medicamentos })
        } catch (error) {
         
            return response.status(422).json({ message: 'error', error })
        }
    }

    static async getMedicamento(request, response){  
        const { id } = request.params
        try {
            const medicamentos = await prisma.medicamentos.findUnique({ where: { id } })
          
            return response.status(200).json({ message: 'medicamento encontrado', medicamentos })
        } catch (error) {
         
            return response.status(422).json({ message: 'error', error })
        }
    }

    static async updateMedicamento(request, response){
        const { id } = request.params

        const { name, data, quantidade, descricao } = request.body
        const token = request.headers.authorization;
        let medicamento = await prisma.medicamentos.findUnique({ where: { id } })

        if (!medicamento) {
            return reply.status(404).send({ message: "medicamento não encontrado" })
        }

        if (name !== undefined && name !== '') {
            medicamento.name = name
        }

        if (data !== undefined && data !== '') {
            medicamento.data = data
        }

        if (quantidade !== undefined && quantidade !== '') {
            medicamento.quantidade = quantidade
        }

        if (descricao !== undefined && descricao !== '') {
            medicamento.descricao = descricao
        }

        const decodedToken = jwt.verify(token, process.env.SECRET);

        const userId = decodedToken.id;

        if (!userId) {
            return response.status(401).send({ message: "Unauthorized. Please log in." });
        }

        medicamento = await prisma.medicamentos.update({ 
            where: {
                id
            },
            data: {
                name: medicamento.name,
                data: medicamento.data,
                quantidade: medicamento.quantidade,
                descricao: medicamento.descricao,
                postoId: userId               
            }
        })
        return response.status(200).json({ message: "medicamento alterado com sucesso", medicamento })
    }

    static async deleteMedicamento(request, response){
        const { id } = request.params 
        const token = request.headers.authorization;
       
       try {
        const decodedToken = jwt.verify(token, process.env.SECRET);

            const userId = decodedToken.id;

            if (!userId) {
                return response.status(401).send({ message: "Unauthorized. Please log in." });
            }

        const medicamento = await prisma.medicamentos.findFirstOrThrow({ 
             where: { id },
             data: { postoId: userId }
        })

        await prisma.medicamentos.delete({ where: { id }, data: { postoId: userId } })

        return response.status(200).json({ message: 'medicamento deletado com sucesso', medicamento })
       } catch (error) {
        return response.status(422).json({ error })
       }
    }
}