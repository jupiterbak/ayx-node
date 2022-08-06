var FormData = require('form-data');

export const worflowDataTemplate = (params: any) =>{
    var form = new FormData();
    form.setBoundary("--alteryx");
    form.append( 'file', params.file  as Buffer, params.name );
    form.append( 'ownerId', params.ownerId );
    form.append( 'name', params.name );
    form.append( 'isPublic', String(params.isPublic || false));
    form.append( 'isReadyForMigration', String(params.isReadyForMigration || false) );
    form.append( 'othersMayDownload', String(params.othersMayDownload || false ) );
    form.append( 'othersCanExecute', String(params.othersCanExecute || false ) );
    form.append( 'executionMode', String(params.executionMode|| false ) );
    form.append( 'comments', params.comments || "Generated by Ayx Typescript SDK" );
    form.append( 'workerTag', params.workerTag || "");
    form.append( 'districtTags', params.districtTags || "");
    form.append( 'hasPrivateDataExemption', String(params.hasPrivateDataExemption || false));
    
    if (params.sourceAppId){
        form.append( 'sourceAppId', params.sourceAppId || "AYX CLI");
    }
    let data = form.getBuffer();
    return data;
}


export const worflowVersionDataTemplate = (params: any) => {
    var form = new FormData();
    form.setBoundary("--alteryx");
    if (params.file){
        form.append( 'file', params.file  as Buffer, params.name );
    }
    form.append( 'ownerId', params.ownerId );
    form.append( 'name', params.name );
    form.append( 'makePublished', String(params.makePublished || false));
    form.append( 'othersMayDownload', String(params.othersMayDownload || false ) );
    form.append( 'othersCanExecute', String(params.othersCanExecute || false ) );
    form.append( 'executionMode', String(params.executionMode|| false ) );
    form.append( 'comments', params.comments || "Generated by Ayx Typescript SDK" );
    if (params.hasPrivateDataExemption){
        form.append( 'hasPrivateDataExemption', String(params.hasPrivateDataExemption || false));
    }
    if (params.sourceAppId){
        form.append( 'sourceAppId', params.sourceAppId || "AYX CLI");
    }
    let data = form.getBuffer();
    return data;
} 