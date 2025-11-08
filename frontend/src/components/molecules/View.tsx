import React, { type JSX } from 'react';
import type { UserViewNode, UserViewResponse } from '../../types';
import DOMPurify from 'dompurify';

/**
 * Um componente recursivo que renderiza uma estrutura de 'Nós'
 * vinda da API.
 */
export function RecursiveView({data}: {data: UserViewResponse}): JSX.Element {
  // Ordenar e 'sanitizar' (Remover códigos maliciosos) os dados de entrada
  // O hook useMemo evita reprocessar os dados se 'data' não mudar
  const sortedAndSanitizedData = React.useMemo(() => {  
    // Função recursiva
    const processNodes = (nodes: UserViewNode[]): UserViewNode[] => {
      if (!nodes || !Array.isArray(nodes)) return [];

      return [...nodes] // Copia para não mutar
        .sort((a, b) => a.order - b.order) // Ordena o nível atual
        .map(node => {
          // Copia o nó para não mutar o original
          const newNode = { ...node };

          // Sanitiza o __html (se existir)
          if (newNode.__html) {
            newNode.__html = DOMPurify.sanitize(newNode.__html);
          }

          // RECURSÃO: Se o nó tiver 'children', processe-os também
          if (newNode.children) {
            newNode.children = processNodes(newNode.children);
          }
          
          return newNode;
        });
    };

    return processNodes(data);
  }, [data]);

  // Mapeia os nós ordenados para elementos React
  return (
    <>
      {sortedAndSanitizedData.map((node) => {
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