// import React, { useEffect } from "react";
// import { useRecoilCallback, useRecoilSnapshot } from "recoil";

// export function DebugObserver() {
//   const snapshot = useRecoilSnapshot();
//   useEffect(() => {
//     console.debug("The following atoms were modified:");
//     for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
//       console.debug(node.key, snapshot.getLoadable(node));
//     }
//   }, [snapshot]);

//   return null;
// }

// export function DebugButton(): React.ReactElement {
//   const onClick = useRecoilCallback(
//     ({ snapshot }) =>
//       async () => {
//         console.debug("Atom values:");
//         for (const node of snapshot.getNodes_UNSTABLE()) {
//           const value = await snapshot.getPromise(node);
//           console.debug(node.key, value);
//         }
//       },
//     []
//   );

//   return (
//     <button
//       style={{ position: "fixed", bottom: "5px", right: "5px" }}
//       onClick={onClick}
//     >
//       Dump State
//     </button>
//   );
// }

export {};
