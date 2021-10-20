import { Skeleton } from "@mui/material";
import React from "react";

StatusSkeleton.propTypes = {};

function StatusSkeleton(props) {
  return (
    <div>
      <Skeleton variant="text" width={50} height={25} />
    </div>
  );
}

export default StatusSkeleton;
