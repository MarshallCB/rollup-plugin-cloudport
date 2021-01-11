import { skypin as sky } from 'skypin'
import { unpkg as un } from 'unpkg-pin'

let default_options = {
  relative_external: false,
  web_external: true,
  shouldReplace: ()=>true
}

type Options = {
  relative_external: boolean,
  web_external: boolean,
  shouldReplace: (module_id:string)=>boolean
}

export function skypin(options:Options){
  options = { ...default_options, ...options }
  return {
    async resolveId(id:string){
      if(id.startsWith('.')){
        if(options.relative_external){
          return { id, external: true }
        }
      } else if(id.startsWith('https://') || id.startsWith('http://')){
        if(options.web_external){
          return { id, external: true }
        }
      } else if(options.shouldReplace(id)){
        return {
          id: await sky(id, { min: true, pin: true}),
          external: true
        }
      }
    }
  }
}

export function unpkg(options:Options){
  options = { ...default_options, ...options }
  return {
    async resolveId(id:string){
      if(id.startsWith('.')){
        if(options.relative_external){
          return { id, external: true }
        }
      } else if(id.startsWith('https://') || id.startsWith('http://')){
        if(options.web_external){
          return { id, external: true }
        }
      } else if(options.shouldReplace(id)){
        return {
          id: await un(id),
          external: true
        }
      }
    }
  }
}