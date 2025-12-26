import cron from "node-cron"

export function cronJob (exp,func){
    cron.schedule(exp,func);
}



