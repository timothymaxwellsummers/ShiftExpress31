import { Card, Stack, Typography } from "@mui/joy";
import teamTileStyles from 'src/styles/teamTiles.module.css';

// Define a type for the props
type TeamTileProps = {
  className: string;
  name: string;
  imageSrc: string;
  desc: string;
  badges?: string[];
  stravaCyclistLink?: string;
};

// Use the type for the component's props
export default function TeamTile({ className, name, imageSrc, desc, badges, stravaCyclistLink }: TeamTileProps) {
    const hasStravaConnection = (badges?.includes('Cyclist') && stravaCyclistLink != null);

    return (
      <Card
          className={teamTileStyles.teamTile + ' ' + className} 
          sx={{
            width: 380,
          }}
      >
        <Stack direction={"column"} gap={2}>
          <Stack direction={"row"} gap={1}>
            <img src={imageSrc} alt={name} className={teamTileStyles.teamTileImage}/>
            <Stack direction={"column"} gap={1}>
              <Typography level="h2" className={teamTileStyles.teamTileTitle}>{name}</Typography>
              <Stack direction={"row"} gap={1}>
              {badges?.map((badge, index) => (
                  (hasStravaConnection && badge === 'Cyclist') ?
                    <a key={index} href={stravaCyclistLink} style={{ color: 'inherit', textDecoration: 'none' }} target='_blank' ><div className={teamTileStyles.teamTileBadge}>{badge}</div></a> :
                    <div key={index} className={teamTileStyles.teamTileBadge}>{badge}</div>
                )) ?? ""}
              </Stack>
            </Stack>
          </Stack>
          <Typography className={teamTileStyles.teamTileDesc}>{desc}</Typography>
        </Stack>  
      </Card>
    );
}
