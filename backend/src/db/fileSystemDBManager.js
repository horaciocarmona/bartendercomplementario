import { promises as fs}  from 'fs'
let resultado=[]
// declaro clase ProducManager 
// la clave unica id
export class ManagerFileSystemDB {
//    constructor(path,title,price,stock,thumpbnail,code,description)
    constructor(path,collection,schema)
    {
        this.path=path
        this.id=0
    } 
    static incrementId(){
      if (this.idIncrement){
          this.idIncrement++
      } else{
          this.idIncrement=1
      }
      return this.idIncrement
    }

    async setConnection() {
        try {
          resultado = await fs.readFile(this.path,'utf-8')
          console.log("conectado a base FileSystem",resultado);
        } catch (error) {
          console.log("error de conexion a FileSystem", error);
        }
      }
    
      async getElements() {
        await this.setConnection();
        try {
          console.log("getelements",resultado)
          let elementos= JSON.parse(resultado)
          return elementos;
        } catch (error) {
          console.log("error en consulta todos los elementos de FileSystem", error);
        }
      }

      async getElementById(id) {
        this.setConnection();
        try {
          const elemento= JSON.parse(resultado).find(prod =>prod.id===id)
          return elemento;
        } catch (error) {
          console.log("error en consulta de un elemento de FileSystem", error);
        }
      }
    
      async deleteElement(id) {
        this.setConnection();
        let mensaje=""
        try {
            const elementos= JSON.parse(resultado)
            let elementoElegido=elementos.find(prod =>prod.id===id)
            if (elementoElegido) {
                const resto=elementos.filter(prod=>prod.id !== id)
                //grabar archivo
                await fs.writeFile(this.path,JSON.stringify(resto))
                mensaje= "elemento eliminado" 
            } else {
                mensaje= "elemento no encontrado"
            }   
        } catch (error) {
          mensaje="error en eliminacion de un elemento de FileSystem";
        }
        return mensaje
      }
      
      async updateElement(id,{...info}) {
        this.setConnection();
        let mensaje=""
        try {
            let elementos= JSON.parse(resultado)
            let elementoElegido= elementos.find(prod =>prod.id===id)
            if (elementoElegido) {
                console.log("elemento a modificar",elementoElegido)
                elementos.forEach(element => {
                    if (element.id==id){
                    }
                });
            //      grabar archivo
                await fs.writeFile(this.path,JSON.stringify(elementos))
                mensaje= elementoElegido
            } else {
                mensaje= "elemento no encontrado"
            }
            return mensaje;
        } catch (error) {
            mensaje="error en modificacion de un elemento de FileSystem"
        }
      }
    
      async addElements([{...elementos}]) {
        await this.setConnection();
        let mensaje=""
        try {
          let id=0
          let elemento=[]
          elemento=JSON.parse(resultado)
          id=ManagerFileSystemDB.incrementId()
          console.log("addelements id ",id)
          let agregar={...elementos,id}

          console.log("addelements agregar ",agregar)
          console.log("addelements resultado ",elemento)
          let agrego=elemento.push(agregar)    
          console.log("addelements result",agrego)
          await fs.writeFile(this.path,JSON.stringify(elemento))
          console.log("write result",elemento)
          mensaje = "se dio de alta elmento";
        } catch (error) {
            mensaje="error en alta de elementos de FileSystem";
        }
 //       return mensaje;
    }
    
    
}