// O retorno de uma "View", na api, é algo como : 
// ```js
// data = [
//         {
//           order: 1,
//           tag: 'h1',
//           className: 'font-extrabold text-3xl mb-4',
//           content: `Bem-vindo(a), ${profile.firstName} ${profile.lastName}!`,
//         },
//         {
//           order: 2,
//           tag: 'ul',
//           className: 'list-disc pl-5 m-4',
//           content: [
//             {
//               order: 1,
//               tag: 'li',
//               __html: `Nome de usuário: <b>${profile.userName}</b>`,
//             },
//             {
//               order: 2,
//               tag: 'li',
//               __html: `Nome completo: <b>${profile.firstName} ${profile.middleName} ${profile.lastName}</b>`,
//             },
//             {
//               order: 3,
//               tag: 'li',
//               __html: `Documento: <b>${profile.document.substring(0, 4)}********</b>`,
//             },
//             {
//               order: 4,
//               tag: 'li',
//               __html: `Data de nascimento: <b>${profile.birthDate.toISOString().substring(0, 10)}</b>`,
//             },
//             {
//               order: 5,
//               tag: 'li',
//               __html: `Papéis: <b>${profile.roles.map((role) => role.name).join(', ')}</b>`,
//             },
//             {
//               order: 6,
//               tag: 'li',
//               __html: `Contatos: <b>${profile.contacts.map((contact) => `${contact.type} - ${contact.__html}`).join('; ')}</b>`,
//             },
//             {
//               order: 7,
//               tag: 'li',
//               __html: `Endereços: <b>${profile.addresses.map((address) => `${address.street}, ${address.number}, ${address.city} - ${address.state}`).join('; ')}</b>`,
//             },
//           ],
//         },
//       ];
//```
// Onde cada elemento do array representa uma "tag" HTML com seu conteúdo.

import type { JSX } from "react";
import type { UserViewResponse } from "../../types";

export function View({ data }: { data: UserViewResponse }) {
  const orderData = data.sort((a, b) => a.order - b.order);
  console.log('View data:', orderData);

  return (
    <div>
      {orderData.map((item, index) => {
        const Tag = item.tag as keyof JSX.IntrinsicElements;
        return (
          <Tag
            key={index}
            className={item.className || ''}
            {...(item.__html !== undefined && {
              dangerouslySetInnerHTML: { __html: item.__html },
            })}
          >
            {item.__html === undefined ? (
              <>
                {Array.isArray(item.content)
                  ? ( item.tag === 'ul' ? (
                    item.content.map((subItem, subIndex) => {
                      const SubTag = subItem.tag as keyof JSX.IntrinsicElements;
                      return (
                        <SubTag
                          key={subIndex}
                          className={subItem.className || ''}
                          {...(subItem.__html !== undefined && {
                            dangerouslySetInnerHTML: { __html: subItem.__html },
                          })}
                        >
                          {subItem.__html === undefined ? subItem.content : null}
                        </SubTag>
                      );
                    })
                  ) : ( <div>...</div> ) ) 
                  : ( item.content )
                }
              </>
            ) : null}
          </Tag>
        );
      })}
    </div>
  );
}
