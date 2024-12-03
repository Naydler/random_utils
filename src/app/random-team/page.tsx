"use client"
import OptionsList from "@/components/option-list";
import TeamList from "@/components/team-list";
import TeamResult from "@/components/TeamResult";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateBalancedTeams } from "@/app/utils/randomTeams";
import { Card, CardContent } from "@/components/ui/card";

export default function RandomTeam() {
    const [option, setOptions] = useState<{ id: number; text: string }[]>([])
    const [team, setTeam] = useState<{ text: string[] }[]>([]);
    const [generatedTeams, setGeneratedTeams] = useState<{ text: string[] }[]>([]); 
    

    const GenerateRandomTeams = (options: { id: number; text: string }[], teams: string[]) => {
        const numberOfTeams = teams.length;
        const balancedTeams = generateBalancedTeams(options, numberOfTeams);
        setGeneratedTeams(balancedTeams.map(team => ({ text: team }))); 

    };
    return (
        <div className="flex justify-between space-x-4 p-7">
            <div className="flex-1">
                <div className="mb-15">
                    <OptionsList options={option} setOptions={setOptions} />
                </div>
                <div className="mt-10">
                    <TeamList team={team} setTeam={setTeam}/>
                </div>
            </div>
            <div className="flex-1 space-x-2">
                
                <Card>
                    <CardContent>
                        <h2 className="text-2xl font-bold mb-4">Equipos Generados</h2>
                        <TeamResult teams={generatedTeams} />
                    </CardContent>
                    <Button
                        disabled={team.length < 2 || option.length < 2}
                        onClick={() => GenerateRandomTeams(option, team.map((t) => t.text).flat())}
                        className="w-full"
                    >
                        Generar Equipos
                    </Button>
                </Card>
              
                
            </div>
        </div>
    );
}


