var FormData = require('form-data');

export const userDataTemplate = (params: any) =>{
    var form = new FormData();
    form.setBoundary("--alteryx");
    form.append( 'file', params.file  as Buffer, params.name );
    form.append( 'name', params.name );
    form.append( 'index', 0 );
    let data = form.getBuffer();
    return data;
}