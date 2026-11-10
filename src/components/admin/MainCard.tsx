'use client';

import Card from 'react-bootstrap/Card';

// Carte standard de Datta Able, portée en TypeScript.
// 'use client' obligatoire : les sous-composants (Card.Header, Card.Body…) ne sont pas
// accessibles depuis un composant serveur.
type Props = {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  secondary?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
};

export default function MainCard({ title, subheader, secondary, footer, className, bodyClassName, children }: Props) {
  return (
    <Card className={className}>
      {title && (
        <Card.Header>
          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
            <div>
              {typeof title === 'string' ? <h5 className="mb-0">{title}</h5> : title}
              {subheader && <small className="text-muted">{subheader}</small>}
            </div>
            {secondary}
          </div>
        </Card.Header>
      )}
      <Card.Body className={bodyClassName}>{children}</Card.Body>
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  );
}
