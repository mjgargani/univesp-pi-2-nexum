import { type JSX } from "react";
import Button from "./Button";
import { useMainContext } from "../../hooks/useMainContext";

export function Alert (): JSX.Element {
  const { handleAlert, alert } = useMainContext();

  return (<>
    {alert?.show && (<div className={`
      absolute top-10 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-xl rounded-lg shadow-xl/30 border z-50 flex flex-row items-center gap-4
      ${alert?.type === 'error' ? 'bg-red-100 text-red-700' : ''}
      ${alert?.type === 'log' ? 'bg-green-100 text-green-700' : ''}
      ${alert?.type === 'warn' ? 'bg-blue-100 text-blue-700' : ''}
    `} role="alert">
      <div className="flex-5">{alert?.message}</div>
      <div className="flex-1 top-0"><Button className="opacity-50" onClick={() => handleAlert({ show: false, type: alert?.type || 'log', message: alert?.message || '...' })}>Dispensar</Button></div>
    </div>)}
  </>);
}