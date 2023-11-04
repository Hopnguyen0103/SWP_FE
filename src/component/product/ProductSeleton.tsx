import * as React from "react";
import Card from "@mui/material/Card";

import { Skeleton } from "@mui/material";

export default function ProductSkeleton() {
  return (
    <Card
      sx={{
        maxWidth: 350,
        borderRadius: "2rem",
        // boxShadow: "none",
      }}
    >
      <Skeleton width="100%" height="16rem" />
      <div
        style={{
          padding: "2rem 2rem 1rem",
        }}
      >
        <Skeleton height="26.5px" width="100%" />
        <Skeleton height={24} width="30%" />
        <div
          style={{
            justifyContent: "space-between",
            paddingTop: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Skeleton height={12} variant="rounded" width={120}/>
          <Skeleton height={48} width={48} variant="circular" />
        </div>
      </div>
    </Card>
  );
}
