export default function DecorativeDivider() {
  return (
    <>
      <style>{`
        .decorative-divider {
          position: sticky;
          top: var(--header-h, 72px);
          z-index: 98;
          width: 100%;
          height: 28px;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            rgba(62, 32, 9, 1) 0%,
            rgba(92, 51, 23, 0.97) 50%,
            rgba(122, 69, 32, 0.95) 100%
          );
          border-top: 1px solid rgba(201, 149, 42, 0.6);
          border-bottom: 1px solid rgba(201, 149, 42, 0.6);
          box-shadow:
            inset 0 1px 3px rgba(0, 0, 0, 0.35),
            inset 0 -1px 3px rgba(0, 0, 0, 0.2);
        }

        .decorative-divider::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 9px,
              rgba(201, 149, 42, 0.18) 9px,
              rgba(201, 149, 42, 0.18) 10px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 9px,
              rgba(201, 149, 42, 0.18) 9px,
              rgba(201, 149, 42, 0.18) 10px
            );
          background-size: 20px 20px;
        }

        .decorative-divider::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 18px,
            rgba(201, 149, 42, 0.12) 18px,
            rgba(201, 149, 42, 0.12) 20px
          );
        }

        .divider-tiles {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0;
          overflow: hidden;
        }

        .divider-tile {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .divider-tile-inner {
          width: 12px;
          height: 12px;
          transform: rotate(45deg);
          background: linear-gradient(
            135deg,
            rgba(201, 149, 42, 0.9) 0%,
            rgba(232, 184, 75, 0.6) 50%,
            rgba(201, 149, 42, 0.3) 100%
          );
          border: 1px solid rgba(201, 149, 42, 0.7);
          box-shadow:
            0 0 4px rgba(201, 149, 42, 0.3),
            inset 0 1px 2px rgba(255, 255, 255, 0.15);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .divider-tile:nth-child(even) .divider-tile-inner {
          width: 7px;
          height: 7px;
          background: linear-gradient(
            135deg,
            rgba(201, 149, 42, 0.5) 0%,
            rgba(232, 184, 75, 0.25) 100%
          );
          border-color: rgba(201, 149, 42, 0.4);
          box-shadow: none;
        }

        .divider-tile:nth-child(3n) .divider-tile-inner {
          width: 10px;
          height: 10px;
          background: linear-gradient(
            135deg,
            rgba(122, 69, 32, 0.8) 0%,
            rgba(201, 149, 42, 0.5) 100%
          );
          border-color: rgba(201, 149, 42, 0.5);
        }

        .decorative-divider:hover .divider-tile-inner {
          opacity: 0.85;
        }

        .decorative-divider:hover .divider-tile:nth-child(odd) .divider-tile-inner {
          transform: rotate(90deg);
        }

        .divider-center-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          transform: translateY(-50%);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(201, 149, 42, 0.15) 5%,
            rgba(201, 149, 42, 0.15) 95%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <div className="decorative-divider" aria-hidden="true">
        <div className="divider-center-line" />
        <div className="divider-tiles">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="divider-tile">
              <div className="divider-tile-inner" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
