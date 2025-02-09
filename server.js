import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

// Criar usuários
app.post('/users', async (req, res) =>{
    try {
        await prisma.users.create({
            data:{
                email:  req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
        res.status(201).json({"Success":"True","Message":"Usuário " + req.body.name + "criado com sucesso"})
    } catch (ex ) {
        res.status(501).json({"Success":"False","Message: ":"Não foi possível criar usuário, verifique sua requisição!"})
    }
})


// Listar usuários
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.users.findMany()
        res.status(200).json(users)
    } catch (ex ) {
        res.status(501).json({"Success":"False","Message: ":"Nenhum registro de usuário encontrado!"})
    }
})


// Criar usuários
app.put('/users/:id', async (req, res) =>{
    try {
        await prisma.users.update({
            where:{
                id: req.params.id
            },
            data:{
                email:  req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        })
        res.status(201).json({"Success":"True","Message":"Usuário " + req.body.name + " atualizado com sucesso"})
    } catch (ex ) {
        res.status(501).json({"Success":"False","Message: ":"Não foi possível criar usuário, verifique sua requisição!"})
    }
})

// Deletar usuários
app.delete('/users/:id', async (req,res) =>{
    try {
        await prisma.users.delete({
            where:{
                id: req.params.id
            }
        })
        res.status(201).json({"Success":"True","Message":"Usuário deletado com sucesso"})
    } catch (ex ) {
        res.status(501).json({"Success":"False","Message: ":"Não foi possível deletar usuário, verifique sua requisição!"})
    }
})

app.listen(3000)

