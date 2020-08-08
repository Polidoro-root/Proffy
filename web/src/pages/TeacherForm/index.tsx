import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api'

const TeacherForm: React.FC = () => {
  const subjectOptions = [
    { value: 'Artes', label: 'Artes' },    
    { value: 'Biologia', label: 'Biologia' },    
    { value: 'Ciências', label: 'Ciências' },    
    { value: 'Educação Física', label: 'Educação Física' },    
    { value: 'Física', label: 'Física' },    
    { value: 'Geografia', label: 'Geografia' },    
    { value: 'História', label: 'História' },    
    { value: 'Matemática', label: 'Matemática' },
    { value: 'Português', label: 'Português' },
    { value: 'Química', label: 'Química' },
  ]

  const weekDayOptions = [
    { value: '0', label: 'Domingo'},
    { value: '1', label: 'Segunda-feira'},
    { value: '2', label: 'Terça-feira'},
    { value: '3', label: 'Quarta-feira'},
    { value: '4', label: 'Quinta-feira'},
    { value: '5', label: 'Sexta-feira'},
    { value: '6', label: 'Sábado'}
  ]

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, to: '', from: '' }
  ])

  const history = useHistory()

  const addNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, to: '', from: '' }
    ])
  }

  const handleCreateClass = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    })
      .then(() => {
        alert('Cadastro Realizado com Sucesso!')
        history.push('/')
      })
      .catch(() => alert('Erro ao Cadastrar no Sistema!'))
  }

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input 
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Input 
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAvatar(e.target.value)}
            />
            <Input 
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a Aula</legend>

            <Select
              name="subject"
              label="Matéria"
              options={subjectOptions}
              value={subject}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSubject(e.target.value)}
            />
            <Input 
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCost(e.target.value)}
            />          
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            
            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da Semana"                  
                  options={weekDayOptions}
                  value={scheduleItem.week_day}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setScheduleItemValue(index, 'from', e.target.value)
                  }}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setScheduleItemValue(index, 'to', e.target.value)
                  }}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante"/>
              Importante! <br/>
              Preencha todos os dados
            </p>

            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm