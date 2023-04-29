function request(url:string, data:any = false, method:string =  'GET') {

    return new Promise(async(resolve:any,reject:any)=>{
        const options:any = {
            method
        }

        if(data && method === 'POST') {
          options.body = JSON.stringify(data);  
        }

       const response = await fetch(url,options);
       const result = await response.json;

       if(response.ok && response.status === 200){
        
        resolve(result)
       }
       else{
        reject(result);
       }
       
    })
}

export const post = (url:string,data:any) =>request(url,data,'POST');

export const get = (url:string) =>request(url)