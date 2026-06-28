// Foundation/Helpers/time.helper.js

// -------------------------------
// CURRENT TIME
// -------------------------------
export const now = () => new Date();

export const timestamp = () => Date.now();

// -------------------------------
// FORMAT DATE
// -------------------------------
export const format = (d,f="YYYY-MM-DD HH:mm:ss") => {
  d=new Date(d);
  const p=n=>String(n).padStart(2,"0");
  return f.replace(/YYYY|MM|DD|HH|mm|ss/g,k=>({
    YYYY:d.getFullYear(),
    MM:p(d.getMonth()+1),
    DD:p(d.getDate()),
    HH:p(d.getHours()),
    mm:p(d.getMinutes()),
    ss:p(d.getSeconds())
  }[k]));
};
// -------------------------------
// TIME DIFFERENCE
// -------------------------------
export const timeDifference = (a,b=new Date()) => {
  const d=Math.abs(new Date(b)-new Date(a));
  return {
    milliseconds:d,
    seconds:Math.floor(d/1e3),
    minutes:Math.floor(d/6e4),
    hours:Math.floor(d/36e5),
    days:Math.floor(d/864e5)
  };
};

// -------------------------------
// TIME AGO
// -------------------------------
export const timeAgo = d => {
  const s=Math.floor((Date.now()-new Date(d))/1e3);
  const m=s/60|0,h=m/60|0,da=h/24|0,mo=da/30|0,y=da/365|0;
  return s<60?`${s}s ago`:m<60?`${m}m ago`:h<24?`${h}h ago`:da<30?`${da}d ago`:mo<12?`${mo}mo ago`:`${y}y ago`;
};

// -------------------------------
// ADD TIME
// -------------------------------
export const addTime = (d,{seconds=0,minutes=0,hours=0,days=0}) =>
  new Date(new Date(d).setSeconds(new Date(d).getSeconds()+seconds)
    +minutes*6e4+hours*36e5+days*864e5);

// -------------------------------
// SUBTRACT TIME
// -------------------------------
export const subtractTime = (d,v) =>
  addTime(d,{seconds:-(v.seconds||0),minutes:-(v.minutes||0),hours:-(v.hours||0),days:-(v.days||0)});

// -------------------------------
// CHECKS
// -------------------------------
export const isExpired = d => new Date(d) < Date.now();
export const isFuture = d => new Date(d) > Date.now();
// -------------------------------
// START / END OF DAY
// -------------------------------
export const startOfDay = (d=new Date()) => (d=new Date(d),d.setHours(0,0,0,0),d);

export const endOfDay = (d=new Date()) => (d=new Date(d),d.setHours(23,59,59,999),d);

// -------------------------------
// DURATION (ms → breakdown)
// -------------------------------
export const duration = ms => ({
  seconds:Math.floor(ms/1e3),
  minutes:Math.floor(ms/6e4),
  hours:Math.floor(ms/36e5),
  days:Math.floor(ms/864e5)
});

export const sleep = (h = 0, m = 0, s = 0) => new Promise(r => setTimeout(r, (h * 3600 + m * 60 + s) * 1000));