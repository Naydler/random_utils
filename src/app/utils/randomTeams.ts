export function generateBalancedTeams(
    options: { id: number; text: string }[],
    numberOfTeams: number
): string[][] {
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);

    const teams: string[][] = [];
    const teamSize = Math.floor(shuffledOptions.length / numberOfTeams); 
    let remaining = shuffledOptions.length % numberOfTeams; 

    let start = 0;
    for (let i = 0; i < numberOfTeams; i++) {
        const end = start + teamSize + (remaining > 0 ? 1 : 0);
        teams.push(shuffledOptions.slice(start, end).map(option => option.text));
        start = end;
        remaining--; 
    }

    return teams;
}