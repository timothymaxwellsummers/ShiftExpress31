import React from 'react';
import { Grid,  } from "@mui/joy";
import TeamTile from './TeamTile';
import styles from '../styles/index.module.css';

interface TeamSectionProps {
    // Add any props you need for the component here
}

const TeamSection: React.FC<TeamSectionProps> = () => {
    return (
        <Grid container columns={6} rowSpacing={15} marginTop={-1} className={styles.teamSection}>
            <Grid xs={2} display="flex" justifyContent="center" alignItems="end">
                <TeamTile
                    className={styles.teamTileTop}
                    imageSrc={"/amiin.png"}
                    name="Amiin Najjar"
                    desc="HCI student with a passion for sport and cooking, I've swapped public transportation for pedaling my bike, blending tech insights with a dash of culinary creativity and a healthy dose of physical activity."
                />
            </Grid>
            <Grid xs={2} display="flex" justifyContent="center" alignItems="end">
                <TeamTile
                    className={styles.teamTileTop}
                    imageSrc={"/lukas.png"}
                    name="Lukas Plenk"
                    desc="I’m a Human-Computer-Interaction student at LMU Munich interested in digital media, culture, and traveling. Just like public transport, I’m always out for the next destination ahead."
                />
            </Grid>
            <Grid xs={2} display="flex" justifyContent="center" alignItems="end">
                <TeamTile
                    className={styles.teamTileTop}
                    imageSrc={"/tim.png"}
                    name="Timothy Summers"
                    desc="I love collaborating in a team and solving creative challenges! Always ready for adventure - I can even handle Munich public transportation during rush hour!"
                />
            </Grid>
            <Grid xs={3} display="flex" justifyContent="center" alignItems="start">
                <TeamTile
                    className={styles.teamTileBottom}
                    imageSrc={"/malek.png"}
                    name="Malek Jarraya"
                    desc="I’m a Media Informatics student at LMU Munich. I love colors, the sun, and the sea. I didn't know much about public transportation in the past, but our project definitely changed that."
                />
            </Grid>
            <Grid xs={3} display="flex" justifyContent="center" alignItems="start">
                <TeamTile
                    className={styles.teamTileBottom}
                    imageSrc={"/maxi.png"}
                    name="Maximilian Wiegand"
                    desc="Hey, I'm a media computer science student at LMU Munich. I love to design, develop and explore - not only for computers. Some ideas even came up in delayed and overcrowded public transport…"
                />
            </Grid>
            
            <div className={styles.introStationDot}></div>
        </Grid>
    );
};

export default TeamSection;
