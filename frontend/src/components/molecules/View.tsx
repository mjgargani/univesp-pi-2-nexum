import React, { type JSX } from 'react';
import type { UserViewResponse } from '../../types';

/**
 * Um componente recursivo que renderiza uma estrutura de 'Nós'
 * vinda da API.
 */
export function RecursiveView({data}: {data: UserViewResponse}): JSX.Element {
  const sortedData = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    // Imutabiliza e ordena os dados pelo campo 'order'
    return [...data].sort((a, b) => a.order - b.order);
  }, [data]);
  console.log({sortedData});
  // Mapeia os nós ordenados para elementos React
  return (
    <>
      {sortedData.map((node) => {
        const {
          tag,
          className,
          __html,
          innerText,
          children,
          order, // 'order' é usado como 'key'
          ...restProps // Pega 'href', 'disabled', 'type', etc.
        } = node;

        // Converte a string 'tag' em um componente (ex: 'h1', 'li', 'button')
        const Tag = tag as keyof JSX.IntrinsicElements;

        return (
          <Tag
            key={order} // Usar 'order' (que deve ser único nesse nível)
            className={className || ''}
            // Passa props extras (ex: 'type="submit"' para um botão)
            {...restProps}
            // Define o conteúdo (HTML perigoso - usar com cuidado)
            {...(__html && { dangerouslySetInnerHTML: { __html } })}
          >
            {/* Renderização recursiva, baseado em 'children' */}
            {
              __html ? null : (       // Se for HTML, não faça nada (já foi feito)
                innerText ? innerText : (  // Se for texto, renderize o texto
                  children ? (           // Se tiver filhos...
                    <RecursiveView data={children} /> // ...CHAME A SI MESMO (Recursão)
                  ) : null               // Senão, não renderize filhos
                )
              )
            }
          </Tag>
        );
      })}
    </>
  );
}