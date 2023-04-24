import {Router} from 'express'
import passport from 'passport'

const routerGithub=Router()

routerGithub.get('/github',passport.authenticate('github',{scope: ['user:email']},
async(req,res)=>{
    console.log('req',req)
}))

routerGithub.get('/githubSession',passport.authenticate('github'),
async(req,res)=>{
    console.log('/githubSession',req.user)
    req.session.user=req.user
    req.session.login=true
    res.redirect('/api/session/product')
})

export default routerGithub