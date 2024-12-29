'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PartyPopper, Pencil, Trash2 } from 'lucide-react'

interface Participant {
    id: number;
    name: string;
    email: string;
    wishlist: string;
    restrictions: number[]; 
}

export default function SecretSanta() {
    const [participants, setParticipants] = useState<Participant[]>([])
    const [newParticipant, setNewParticipant] = useState({ name: '', email: '', wishlist: '' })
    const [editingId, setEditingId] = useState<number | null>(null)
    const [selfExclusions, setSelfExclusions] = useState<{ [id: number]: boolean }>({}) 

    const addParticipant = () => {
        if (newParticipant.name && newParticipant.email) {
            setParticipants([
                ...participants,
                { ...newParticipant, id: Date.now(), restrictions: [] }
            ]);
            setNewParticipant({ name: '', email: '', wishlist: '' })
        }
    }

    const editParticipant = (id: number) => {
        setEditingId(id)
        const participant = participants.find(p => p.id === id)
        if (participant) {
            setNewParticipant({ name: participant.name, email: participant.email, wishlist: participant.wishlist })
        }
    }

    const updateParticipant = () => {
        if (editingId !== null) {
            setParticipants(participants.map(p =>
                p.id === editingId
                    ? { ...newParticipant, id: p.id, restrictions: p.restrictions || [] } 
                    : p
            ));
            setEditingId(null);
            setNewParticipant({ name: '', email: '', wishlist: '' });
        }
    };

    const deleteParticipant = (id: number) => {
        setParticipants(participants.filter(p => p.id !== id))
        const updatedExclusions = { ...selfExclusions }
        delete updatedExclusions[id]
        setSelfExclusions(updatedExclusions)
    }

    
    const toggleRestriction = (giverId: number, receiverId: number) => {
        setParticipants((prev) =>
            prev.map((participant) => {
                if (participant.id === giverId) {
                    const restrictions = participant.restrictions.includes(receiverId)
                        ? participant.restrictions.filter((id) => id !== receiverId) 
                        : [...participant.restrictions, receiverId]; 

                    return { ...participant, restrictions };
                }
                return participant;
            })
        );
    };

    const handlerLottery = async () => {
        if (participants.length < 2) {
            alert("Debe haber al menos dos participantes para realizar el sorteo.");
            return;
        }

        const assignments: { giver: string; receiver: string; email: string; wishlist: string }[] = [];
        let unassigned = [...participants];

        for (const giver of participants) {
            const possibleReceivers = unassigned.filter(
                (receiver) => !giver.restrictions.includes(receiver.id) && receiver.id !== giver.id
            );

            if (possibleReceivers.length === 0) {
                alert(`No es posible realizar el sorteo debido a las restricciones de ${giver.name}.`);
                return;
            }

            const receiver = possibleReceivers[Math.floor(Math.random() * possibleReceivers.length)];

            assignments.push({
                giver: giver.name,
                receiver: receiver.name,
                email: giver.email,
                wishlist: receiver.wishlist || 'Sin wishlist'
            });

            unassigned = unassigned.filter((p) => p.id !== receiver.id);
        }

        for (const assignment of assignments) {
            console.log('Enviando correo con los datos:', assignment); 
            try {
                const response = await fetch('http://localhost:3000/api/sendEmail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: assignment.email,
                        subject: 'Tu Amigo Invisible 🎅',
                        giver: assignment.giver,
                        receiver: assignment.receiver,
                        wishlist: assignment.wishlist,
                    }),
                });

                if (!response.ok) {
                    console.error(`Error al enviar correo a ${assignment.email}`);
                }
            } catch (error) {
                console.error(`Error en la solicitud para ${assignment.email}:`, error);
            }
        }

        alert("¡Sorteo realizado y correos enviados!");
    }
    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold mb-6">Secret Santa / Amigo Invisible</h1>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Añadir Participante</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input
                            placeholder="Nombre"
                            value={newParticipant.name}
                            onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                        />
                        <Input
                            placeholder="Correo"
                            value={newParticipant.email}
                            onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                        />
                        <Input
                            placeholder="Lista de deseos"
                            value={newParticipant.wishlist}
                            onChange={(e) => setNewParticipant({ ...newParticipant, wishlist: e.target.value })}
                        />
                        <Button onClick={editingId !== null ? updateParticipant : addParticipant} className="w-full">
                            {editingId !== null ? 'Actualizar' : 'Añadir'} Participante
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Lista de Participantes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Correo</TableHead>
                                <TableHead>Lista de deseos</TableHead>
                                <TableHead>Evitar asignación</TableHead>
                                <TableHead>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {participants.map((participant) => (
                                <TableRow key={participant.id}>
                                    <TableCell>{participant.name}</TableCell>
                                    <TableCell>{participant.email}</TableCell>
                                    <TableCell>{participant.wishlist}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col space-y-2">
                                            {participants
                                                .filter(p => p.id !== participant.id)
                                                .map((otherParticipant) => (
                                                    <label key={otherParticipant.id} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={participant.restrictions.includes(otherParticipant.id)}
                                                            onChange={() => toggleRestriction(participant.id, otherParticipant.id)}
                                                        />
                                                        <span>{otherParticipant.name}</span>
                                                    </label>
                                                ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => editParticipant(participant.id)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => deleteParticipant(participant.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <div className="flex justify-end mt-4">
                    <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={handlerLottery}
                        disabled={participants.length < 2}
                    >
                        Iniciar sorteo
                    </Button>
                </div>
            </Card>
        </div>
    )
}