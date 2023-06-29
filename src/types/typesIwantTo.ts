export type subjectInfo = {
    directorOrRepresentors: [
        {
            firstName:string,
            lastName:string,
            personalNumber:string,
            idNumber:string,
            entityType:string,
            name:string,
            personType:string,
            representRights:string ,
            legalForm: string
        }
    ],
    procurists: [
        {
            firstName:string,
            lastName:string,
            personalNumber:string,
            idNumber:string,
            entityType:string,
            entityTypeId:0,
            name:string,
            legalForm: string
        }
    ],
    founderList: [
        {
            firstName:string,
            lastName:string,
            personalNumber:string,
            idNumber:string,
            entityType:string,
            entityTypeId:0,
            founderType:0,
            founderTypeId:0, 
            name:string,
            legalForm: string
        }
    ],
    registrationMunicipality: [
        {
            firstName:string,
            lastName:string,
            personalNumber:string,
            idNumber:string,
            entityType:string,
            entityTypeId:0,
            name:string,
            legalForm: string
        }
    ],
    governBoards: [
        {
            boardTypeId :0,
            boardName :string,
            personalNumber:string,
            idNumber:string,
            entityType:string,
            entityTypeId:0,
            name:string,
            legalForm: string
        }
    ]
}