"use client";

/**
 * Calm atmospheric background — soft gradients only, no 3D/parallax.
 */
const Scene3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(0,229,160,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_85%_65%,rgba(34,211,238,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,8,12,0.75)_100%)]" />
    </div>
  );
};

export default Scene3D;
