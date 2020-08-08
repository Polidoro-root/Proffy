import React, { useState, ChangeEvent, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'
import './styles.css'

const TeacherList: React.FC = () => {
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

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')
  const [teachers, setTeachers] = useState([])

  const searchTeachers = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await api.get('/classes', {
      params: {        
        week_day,
        subject,
        time
      }
    })

    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os Proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            options={subjectOptions}
            value={subject}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSubject(e.target.value)}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            options={weekDayOptions}
            value={week_day}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setWeekDay(e.target.value)}
          />
          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
          />

          <button type="submit">
            Buscar
          </button>
        </form> 
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  )
}

export default TeacherList