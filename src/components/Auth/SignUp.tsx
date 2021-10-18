import {useState,useRef} from 'react'
import { FormHandles } from '@unform/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import * as Yup from 'yup'
import {Form} from '@unform/web'
import Input from '@/shared/unform'

import styles from './style.module.scss'
import Animation from '@/shared/lottie/animation'

type FormData = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignIn: NextPage = () => {

  const formRef = useRef<FormHandles>(null)

  const [inputErrorName,setInputErrorName]= useState(false)
  const [inputErrorEmail,setInputErrorEmail]= useState(false)
  const [inputErrorPass,setInputErrorPass]= useState(false)
  const [inputErrorConfirmPass,setInputErrorConfirmPass]= useState(false)
 
  async function  handleSubmit (data: FormData) {
    
    try{
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(3,'No mínimo 3 caracteres')
          .required('O nome é obrigatório'), 
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string()
          .min(6,'No mínimo 6 caracteres')
          .required('O senha é obrigatória'), 
        passwordConfirmation: Yup.string()
          .min(6,'No mínimo 6 caracteres')
          .test('passwords-match', 'A senha deve ser a mesma', function(value){
            return this.parent.password === value
          })
          .required('O confirmar a senha é obrigatória')
      })

      const validateFilsd = schema.isValidSync(data)

 
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


      if(data.email === '' || !regex.test(data.email)){
        setInputErrorEmail(true)
      }else{
        setInputErrorEmail(false)
      }

      if(data.name === '' || data.name.length < 3){
        setInputErrorName(true)
      } else{
        setInputErrorName(false)
      }

      if(data.password === '' || data.password.length < 6){
        setInputErrorPass(true)
      } else{
        setInputErrorPass(false)
      }

      if(data.passwordConfirmation === '' || data.passwordConfirmation.length < 6 || data.password !== data.passwordConfirmation){
        setInputErrorConfirmPass(true)
      }else{
        setInputErrorConfirmPass(false)
      }

      if(validateFilsd===true){
        //enviar dados
      }

      await schema.validate(data,{
        abortEarly: false
      })
       formRef?.current?.setErrors({})

    } catch (error:any){
      if(error instanceof Yup.ValidationError){
        const errorMessages:any = {
        }
        error.inner.forEach((error:any) => {
          errorMessages[error.path] = error.message
        })

        formRef?.current?.setErrors(errorMessages)
      }
    }

  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Unform - Com NextJs</title>
        <meta name="description" content="Unform com Next Js e Typescript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.animation_warpper}>
          <div className={styles.animation}>
            <Animation/>
          </div>
        </section>

        <section className={styles.form_wrapper}>
          <Form  ref={formRef}  onSubmit={handleSubmit}>
              <h1>Cria a sua conta!</h1>
              <p>Criado por programadores<br/> para programadores</p>
              <div className={styles.input_container}>
                  <section 
                     className={inputErrorName ?  styles.input_error : '' }
                  >
                    <Image src="/assets/icons/user.svg" alt="User Icon" className={styles.img} width={20} height={20} />
                    <Input type="text" name="name"placeholder="Insira o seu nome" className={styles.input} />
                  </section>
                  <section 
                    className={inputErrorEmail ?  styles.input_error : '' }
                  >
                    <Image src="/assets/icons/email.svg" alt="User Icon" className={styles.img} width={20} height={20} />
                    <Input type="email" name="email"placeholder="Insira o seu e-mail" className={styles.input} />
                  </section>
                  <section 
                    className={inputErrorPass ?  styles.input_error : '' }
                  >
                    <Image src="/assets/icons/key.svg" alt="User Icon" className={styles.img} width={20} height={20} />
                    <Input type="password" name="password"placeholder="Defina uma senha" className={styles.input} />
                  </section>
                  <section 
                    className={inputErrorConfirmPass ?  styles.input_error : '' }
                  >
                    <Image src="/assets/icons/confirm.svg" alt="User Icon" className={styles.img} width={20} height={20} />
                    <Input type="password" name="passwordConfirmation"placeholder="Confirme a senha" className={styles.input} />
                  </section>

                  <button type="submit"> Criar conta</button>
                  <p className={styles.sigin_link}>Já tem conta? <span>Iniciar sessão</span></p>
              </div>
          </Form>
        </section>
      </main>
    </div>
  )
}

export default SignIn
