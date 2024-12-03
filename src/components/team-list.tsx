"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

interface TeamsListProps {
    team: { text: string[] }[]; 
    setTeam: React.Dispatch<React.SetStateAction<{ text: string[] }[]>>;
}


const TeamList = ({team, setTeam}: TeamsListProps) => {

    const addTeam = () => {
        setTeam([...team, { text: [`Team ${team.length + 1}`] }]);
    }
    const deleteTeam = () => {
        setTeam(team.slice(0, -1));
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Lista de Equipos</h2>
                <div className="flex space-x-2 mb-4">
                    <Button onClick={addTeam} className="bg-blue-500 text-white">
                        Añadir Equipo
                    </Button>

                    <Button
                        onClick={deleteTeam}
                        disabled={team.length === 0}
                    >
                        Eliminar Último Equipo
                    </Button>
                </div>

                <ul className="space-y-2">
                    {team.map((t, index) => (
                        <li
                            key={index}
                            className="bg-secondary p-2 rounded text-center border border-gray-200"
                        >
                            {t.text.join(', ')} 
                        </li>
                    ))}
                </ul>

                {team.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">No hay equipos aún.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default TeamList;
