import { Box, Grid, Typography, Button, ButtonGroup } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs
          sx={{ maxWidth: { xs: "100%", sm: "45%" }, minWidth: 300, zIndex: 1 }}
        >
          <Box sx={{ margin: "10px", padding: "10px 20px" }}>
            <Typography variant="h3" sx={{ marginBottom: "5px" }}>
              <a id="back-to-top"></a>
              Sir. Fourier
            </Typography>
            <Typography paragraph align="left">
              Joseph Fourier, matematico francese del XIX secolo, è noto per il
              suo lavoro sulla decomposizione di funzioni periodiche in una
              somma di funzioni sinusoidali o cosinusoidali, nota come Serie di
              Fourier. Fourier ha fornito le basi teoriche per la Serie di
              Fourier, che è diventata uno strumento essenziale
              nell&apos;analisi delle funzioni periodiche e nel campo della
              matematica applicata.
            </Typography>
            <ButtonGroup aria-label="Action buttons" size="small">
              <Button variant="contained" href="/lab">
                <Typography
                  variant="button"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  Vai al lab!
                </Typography>
              </Button>
              <Button variant="outlined" href="/fourier">
                <Typography
                  variant="button"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  Scopri Fourier!
                </Typography>
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{ maxWidth: 550, minWidth: 200 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="/imgs/SirFourier.webp"
              alt="Ritratto di Fourier"
              width={1920}
              height={1080}
              priority
              style={{ width: "75%", height: "auto" }}
            ></Image>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
