'use client'

import { useState } from 'react'
import { PlusCircle, X, Edit2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface OptionsListProps {
    options: { id: number; text: string }[];
    setOptions: React.Dispatch<React.SetStateAction<{ id: number; text: string }[]>>;
}

export default function OptionsList({ options, setOptions }: OptionsListProps) {
    const [newOption, setNewOption] = useState<string>('')
    const [editingId, setEditingId] = useState<number | null>(null)
    const [error, setError] = useState<string>('') 

    const addOption = () => {
        const normalizedOption = newOption.trim().toLowerCase()

        // Verifica si la opción ya existe, sin importar mayúsculas/minúsculas
        if (normalizedOption === '') {
            setError('El texto no puede estar vacío.')
            return
        }

        if (options.some(option => option.text.toLowerCase() === normalizedOption)) {
            setError('La opción ya existe.')
            return
        }

        // Si no hay error, agrega la opción
        setOptions([...options, { id: Date.now(), text: newOption }])
        setNewOption('')
        setError('') // Limpiar el error después de añadir
    }

    const deleteOption = (id: number) => {
        setOptions(options.filter(option => option.id !== id))
    }

    const startEditing = (id: number) => {
        setEditingId(id)
        const optionToEdit = options.find(option => option.id === id)
        if (optionToEdit) {
            setNewOption(optionToEdit.text)
        }
    }

    const saveEdit = () => {
        if (editingId !== null && newOption.trim() !== '') {
            const normalizedOption = newOption.trim().toLowerCase()
            if (options.some(option => option.text.toLowerCase() === normalizedOption)) {
                setError('La opción ya existe.')
                return
            }
            setOptions(options.map(option =>
                option.id === editingId ? { ...option, text: newOption.trim() } : option
            ))
            setEditingId(null)
            setNewOption('')
            setError('')
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Lista de Opciones</h2>
                <div className="flex space-x-2 mb-4">
                    <Input
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="Nueva opción"
                        className="flex-grow"
                    />
                    <Button onClick={editingId !== null ? saveEdit : addOption}>
                        {editingId !== null ? 'Guardar' : 'Añadir'}
                    </Button>
                </div>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <ul className="space-y-2">
                    {options.length === 0 && (
                        <p className="text-gray-500 text-center mt-4">No hay opciones aún.</p>
                    )}
                    {options.map(option => (
                        <li key={option.id} className="flex items-center justify-between bg-secondary p-2 rounded">
                            <span>{option.text}</span>
                            <div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => startEditing(option.id)}
                                    className="mr-2"
                                >
                                    <Edit2 className="h-4 w-4" />
                                    <span className="sr-only">Editar opción</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteOption(option.id)}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Eliminar opción</span>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}