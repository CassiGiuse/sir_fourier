import { Box, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

export default function FourierPage() {
  return (
    <React.Fragment>
      <Box component={"section"} width={"92%"}>
        <Typography
          paragraph
          align="justify"
          sx={{ padding: "20px", lineHeight: 1.8 }}
        >
          <Image
            src="/icons/gear.png"
            alt="Descrizione dell'immagine"
            width={200}
            height={200}
            style={{ float: "right", height: "auto", margin: "0 0 20px 20px" }}
          />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br />
          Repudiandae, vitae voluptatum alias sequi officiis eum non amet ut
          perferendis aperiam? Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Delectus aliquid ullam nam sit eaque tempora at qui
          reprehenderit dolor, facere, molestiae vel quos adipisci, illum esse
          ea aspernatur alias porro architecto itaque. <br />
          Illo architecto dolor reprehenderit atque sunt tempore magni, laborum
          repudiandae est quia. Eius excepturi eos hic sint asperiores. <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
          Numquam labore magnam laboriosam alias hic rem, sit et animi?
          <br />
          Temporibus reiciendis illo dignissimos quos quas commodi? <br />
          Nesciunt reiciendis tempora rerum labore fuga qui suscipit quidem
          quisquam fugit. Dolores sapiente consequatur recusandae asperiores.
          Nihil obcaecati et eos sit totam vitae molestias temporibus.
          f
        </Typography>
      </Box>
    </React.Fragment>
  );
}
