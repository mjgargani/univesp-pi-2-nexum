import { useEffect, useState } from "react";

// Considerando que o formato arbitrário de um Hypermedia Form deve ser algo como:
// ```json
// {
//   "title": "Formulário de Login",
//   "action": {
//     "href": "/auth/login",
//     "rel": "login",
//     "method": "POST"
//   },
//   "form": [
//     {
//       "order": 1,
//       "row": [
//         {
//           "order": 1,
//           "col": [
//             {
//               "name": "userName",
//               "type": "text",
//               "label": "Insira seu nome de Usuário",
//               "required": true
//             }
//           ]
//         },
//         {
//           "order": 2,
//           "col": [
//             {
//               "name": "password",
//               "type": "password",
//               "label": "Insira sua senha",
//               "required": true
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "order": 2,
//       "row": [
//         {
//           "order": 1,
//           "col": [
//             {
//               "name": "submitLoginBtn",
//               "type": "button",
//               "label": "Entrar",
//               "submit": true
//             }
//           ]
//         },
//         {
//           "order": 2,
//           "col": [
//             {
//               "name": "forgotPasswordBtn",
//               "type": "button",
//               "label": "Esqueceu sua senha?",
//               "disabled": true
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }
// ```
export default function Form({ formData }: { formData: any }) {
  const [formHeader, setFormHeader] = useState<any>(null);
  const [formComposition, setFormComposition] = useState<any>(null);

  useEffect(() => {
    // Ordernar dados do formulárico com base em seus atributos 'order', se existirem
    const orderFormData = (data: any[]): any[] => {
      return data
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((item) => {
          const newItem = { ...item };
          Object.keys(newItem).forEach((key) => {
            if (Array.isArray(newItem[key])) {
              newItem[key] = orderFormData(newItem[key]);
            }
          });
          return newItem;
        });
    };

    if(formData.title && formData.action) {
      setFormHeader({
        title: formData.title,
        action: formData.action,
      });
    }

    const newFormDataState = orderFormData(formData.form);
    console.log(newFormDataState)
    setFormComposition(newFormDataState);
  }, [formData]);

  // form[] -> { row[] -> { col[] -> fields[] (inline) } }

  return (
    <div className="flex bg-[var(--fg)] rounded-lg overflow-hidden w-full p-4">
      { (formHeader && formComposition) && (
        <form action={formHeader.action?.href} method={formHeader.action?.method || "GET"} className="flex flex-col flex-grow w-full">
          {formComposition.map((rowItem, i) => {
            return (
              <div className="flex flex-wrap justify-center gap-4 w-full">
                { 
                  rowItem.row.map((colItem, i) => (
                    <div key={i} className="flex flex-wrap flex-1 mb-4">
                      {
                        colItem.col.map((field: any, j: number) => {
                          if (field.type === "button") {
                            return (
                              <button
                                key={j}
                                name={field.name}
                                type={field.submit ? "submit" : "button"}
                                disabled={field.disabled || false}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                {field.label || "Button"}
                              </button>
                            );
                          } else {
                            return (
                              <div key={j} className="mb-2">
                                {field.label && (
                                  <label htmlFor={field.name} className="block text-[var(--text)] text-sm font-bold mb-2">
                                    {field.label}
                                  </label>
                                )}
                                <input
                                  id={field.name}
                                  name={field.name}
                                  type={field.type || "text"}
                                  required={field.required || false}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[var(--text)] leading-tight focus:outline-none focus:shadow-outline bg-[var(--bg)]"
                                />
                              </div>
                            );
                          }
                        })
                      }
                    </div>
                  ))
                }
              </div>
            );
          })}
        </form>
      )}
    </div>
  );
}