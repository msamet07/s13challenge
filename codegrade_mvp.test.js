// 👉 `npm test`
const request = require('supertest')
const db = require('./data/dbConfig')
const Action = require('./api/actions/actions-model')
const Project = require('./api/projects/projects-model')
const server = require('./api/server')

const projectA = {
  name: 'a', description: 'b', completed: false,
}
const projectB = {
  name: 'c', description: 'd', completed: true,
}
const actionA = {
  project_id: 1, description: 'x', notes: 'y', completed: false,
}
const actionB = {
  project_id: 1, description: 'u', notes: 'v', completed: true,
}
const actions = [actionA, actionB]

beforeAll(async () => {
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('actions').truncate()
  await db('projects').truncate()
  await db('projects').insert(projectA)
  await db('projects').insert(projectB)
  await db('actions').insert(actionA)
  await db('actions').insert(actionB)
})
afterAll(async () => {
  await db.destroy()
})

test('[0] sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  // 👉 PROJECTS
  // 👉 PROJECTS
  // 👉 PROJECTS
  describe('projects uçnoktası', () => {
    describe('[GET] /api/projects', () => {
      test('[1] tüm projeleri döndürüyor', async () => {
        const res = await request(server).get('/api/projects')
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toMatchObject(projectA)
        expect(res.body[1]).toMatchObject(projectB)
      }, 750)
      test('[2] proje yoksa null döndürüyor', async () => {
        await db('projects').truncate()
        const res = await request(server).get('/api/projects')
        expect(res.body).toHaveLength(0)
      }, 750)
    })
    describe('[GET] /api/projects/:id', () => {
      test('[3] verilen id li projeyi döndürüyor', async () => {
        const res1 = await request(server).get('/api/projects/1')
        const res2 = await request(server).get('/api/projects/2')
        expect(res1.body).toMatchObject(projectA)
        expect(res2.body).toMatchObject(projectB)
      }, 750)
      test('[4] proje yoksa 404 döndürüyor', async () => {
        const res = await request(server).get('/api/projects/11')
        expect(res.status).toBe(404)
      }, 750)
    })
    describe('[POST] /api/projects', () => {
      test('[5] yeni oluşturulan projeyi döndürüyor', async () => {
        const projectNew = { name: 'e', description: 'f', completed: true }
        const res = await request(server).post('/api/projects').send(projectNew)
        expect(res.body).toMatchObject(projectNew)
      }, 750)
      test('[6] projeler tablosuna yeni proje ekliyor', async () => {
        const projectNew = { name: 'e', description: 'f', completed: true }
        await request(server).post('/api/projects').send(projectNew)
        const project = await Project.get(3)
        expect(project).toMatchObject(projectNew)
      }, 750)
      test('[7] gerekli proplar eksikse 400 yanıtlıyor', async () => {
        let projectNew = { name: 'e' }
        let res = await request(server).post('/api/projects').send(projectNew)
        expect(res.status).toBe(400)
        projectNew = { description: 'e' }
        res = await request(server).post('/api/projects').send(projectNew)
        expect(res.status).toBe(400)
        projectNew = {}
        res = await request(server).post('/api/projects').send(projectNew)
        expect(res.status).toBe(400)
      }, 750)
    })
    describe('[PUT] /api/projects/:id', () => {
      test('[8] güncellenen projeyi dödnürüyor', async () => {
        let changes = { ...projectA, completed: !projectA.completed }
        let res = await request(server).put('/api/projects/1').send(changes)
        expect(res.body).toMatchObject(changes)
        changes = { ...projectA, description: 'Lady Gaga' }
        res = await request(server).put('/api/projects/1').send(changes)
        expect(res.body).toMatchObject(changes)
      }, 750)
      test('[9] projeler tablosundaki projeyi güncelliyor', async () => {
        let changes = { ...projectA, completed: !projectA.completed }
        await request(server).put('/api/projects/1').send(changes)
        let project = await Project.get(1)
        expect(project.completed).toBe(true)
        changes = { ...projectA, name: 'Gaga project' }
        await request(server).put('/api/projects/1').send(changes)
        project = await Project.get(1)
        expect(project.name).toBe('Gaga project')
      }, 750)
      test('[10] gerekli değerler yokken 400 yanıtlıyor', async () => {
        let res = await request(server).put('/api/projects/1').send({ description: 'b', completed: false })
        expect(res.status).toBe(400)
        res = await request(server).put('/api/projects/1').send({ name: 'a', completed: false })
        expect(res.status).toBe(400)
        res = await request(server).put('/api/projects/1').send({ name: 'a', description: 'b' })
        expect(res.status).toBe(400)
        res = await request(server).put('/api/projects/1').send({})
        expect(res.status).toBe(400)
      }, 750)
    })
    describe('[DELETE] /api/projects/:id', () => {
      test('[11] verilen idliyi siliyor', async () => {
        await request(server).delete('/api/projects/1')
        let res = await Project.get()
        expect(res).toMatchObject([projectB])
        await request(server).delete('/api/projects/2')
        res = await Project.get()
        expect(res).toMatchObject([])
      }, 750)
      test('[12] proje yoksa 404 yanıtlıyor', async () => {
        const res = await request(server).delete('/api/projects/11')
        expect(res.status).toBe(404)
      }, 750)
    })
    describe('[GET] /api/projects/:id/actions', () => {
      test('[13] verilen idli proje eylemi', async () => {
        const res = await request(server).get('/api/projects/1/actions')
        expect(res.body).toMatchObject(actions)
      }, 750)
      test('[14] eylem yoksa boş döndürüyor', async () => {
        const res = await request(server).get('/api/projects/2/actions')
        expect(res.body).toMatchObject([])
      }, 750)
    })
  })
  // 👉 ACTIONS
  // 👉 ACTIONS
  // 👉 ACTIONS
  describe('actions uşnoktası', () => {
    describe('[GET] /api/actions', () => {
      test('[15] tüm eylemleri döndürüyor', async () => {
        const res = await request(server).get('/api/actions')
        expect(res.body).toHaveLength(2)
        expect(res.body[0]).toMatchObject(actionA)
        expect(res.body[1]).toMatchObject(actionB)
      }, 750)
      test('[16] eylem yoksa boş döndürüyor', async () => {
        await db('actions').truncate()
        const res = await request(server).get('/api/actions')
        expect(res.body).toHaveLength(0)
      }, 750)
    })
    describe('[GET] /api/actions/:id', () => {
      test('[17] verilen id li eylemi getiriyor', async () => {
        const res1 = await request(server).get('/api/actions/1')
        const res2 = await request(server).get('/api/actions/2')
        expect(res1.body).toMatchObject(actionA)
        expect(res2.body).toMatchObject(actionB)
      }, 750)
      test('[18] verilen idde eylem yoksa 404 yanıtlıyor', async () => {
        const res = await request(server).get('/api/actions/11')
        expect(res.status).toBe(404)
      }, 750)
    })
    describe('[POST] /api/actions', () => {
      test('[19] oluşturulan eylemmi döndürüyor', async () => {
        const actionNew = { project_id: 2, description: 'm', notes: 'n', completed: false }
        const res = await request(server).post('/api/actions').send(actionNew)
        expect(res.body).toMatchObject(actionNew)
      }, 750)
      test('[20] yeni eylem oluşturuyor veritabanında', async () => {
        const actionNew = { project_id: 2, description: 'm', notes: 'n', completed: false }
        await request(server).post('/api/actions').send(actionNew)
        const action = await Action.get(3)
        expect(action).toMatchObject(actionNew)
      }, 750)
      test('[21] istek gövdesinde eksikler varsa 400 yanıtlıyor', async () => {
        const actionNew = { project_id: 2, description: 'm' }
        const res = await request(server).post('/api/actions').send(actionNew)
        expect(res.status).toBe(400)
      }, 750)
    })
    describe('[PUT] /api/actions/:id', () => {
      test('[22] güncellenen eylemi döndürüyor', async () => {
        const action = await Action.get(1)
        const changes = { ...action, completed: true }
        expect(action.completed).toBe(false)
        const res = await request(server).put('/api/actions/1').send(changes)
        expect(res.body).toMatchObject(changes)
      }, 750)
      test('[23] güncellenen eylemi veritabanında güncelliyor', async () => {
        let action = await Action.get(1)
        await request(server).put('/api/actions/1').send({ ...action, completed: !action.completed })
        let updated = await Action.get(1)
        expect(updated.completed).toBe(!action.completed)
      }, 750)
      test('[24] responds with a 400 if the request body is missing missing notes, description, completed or project_id', async () => {
        const res = await request(server).put('/api/actions/1').send({})
        expect(res.status).toBe(400)
      }, 750)
    })
    describe('[DELETE] /api/actions/:id', () => {
      test('[25] verilen id li eylemi siliyor', async () => {
        await request(server).delete('/api/actions/1')
        let actions = await Action.get()
        expect(actions).toMatchObject([actionB])
        await request(server).delete('/api/actions/2')
        actions = await Action.get()
        expect(actions).toMatchObject([])
      }, 750)
      test('[26] verilen id li eylem yoksa 404 yanıtlıyor', async () => {
        const res = await request(server).get('/api/actions/11')
        expect(res.status).toBe(404)
      }, 750)
    })
  })
})
