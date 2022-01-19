export class KnowledgeData{
    constructor(title, lv, link,message="", code="", result="", adjustables=[], L0=null,L1=null,L2=null){
        this.title = title,
        this.lv = lv,
        this.link = link,
        this.L0 = L0,
        this.L1 = L1,
        this.L2 = L2,
        this.message = message,
        this.code = code,
        this.result = result
        this.adjustables = adjustables
    }
}