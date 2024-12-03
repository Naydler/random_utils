"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamResultProps {
    teams: { text: string[] }[]; // Tipo de los equipos
}

const TeamResult: React.FC<TeamResultProps> = ({ teams }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.length === 0 && (
                <p className="text-gray-500 text-center mt-4">No hay equipos aún.</p>
            )}
            {teams.map((team, index) => (
                <Card key={index} className="border border-gray-200 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-center">
                            Equipo {index + 1}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                            {team.text.map((member, idx) => (
                                <li key={idx} className="text-gray-700">
                                    {member}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default TeamResult;