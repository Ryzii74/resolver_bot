module.exports = (text) => {
    const [lat, lon, ang, dist] = text.split(' ');
    const {lat: lat2, lon: lon2} = ellipsoid(toRad(lat), toRad(lon), toRad(ang), dist);
    return `${lat2.toFixed(6)} ${lon2.toFixed(6)}`;
};

function ellipsoid(lat, lon, ang, dist) {
    const flat = 298.257223563;
    const a = 6378137;
    const b = 6356752.314245;
    const f = 1/flat
    const sb=Math.sin(ang);
    const cb=Math.cos(ang)
    const tu1=(1-f)*Math.tan(lat);
    const cu1=1/Math.sqrt((1+tu1*tu1))
    const su1=tu1*cu1;
    const s2=Math.atan2(tu1, cb)
    const sa = cu1*sb
    const csa=1-sa*sa
    const us=csa*(a*a - b*b)/(b*b)
    const A=1+us/16384*(4096+us*(-768+us*(320-175*us)))
    const B = us/1024*(256+us*(-128+us*(74-47*us)))
    let s1=dist/(b*A)
    let s1p = 2*Math.PI;


    let cs1m, ss1, cs1, ds1;
    while (Math.abs(s1-s1p) > 1e-12) {
        cs1m=Math.cos(2*s2+s1)
        ss1=Math.sin(s1)
        cs1=Math.cos(s1)
        ds1=B*ss1*(cs1m+B/4*(cs1*(-1+2*cs1m*cs1m)- B/6*cs1m*(-3+4*ss1*ss1)*(-3+4*cs1m*cs1m)))
        s1p=s1
        s1=dist/(b*A)+ds1
    }

    const t=su1*ss1-cu1*cs1*cb
    const lat2=Math.atan2(su1*cs1+cu1*ss1*cb, (1-f)*Math.sqrt(sa*sa + t*t))
    const l2=Math.atan2(ss1*sb, cu1*cs1-su1*ss1*cb)
    const c=f/16*csa*(4+f*(4-3*csa))
    const l=l2-(1-c)*f*sa* (s1+c*ss1*(cs1m+c*cs1*(-1+2*cs1m*cs1m)))
    const d=Math.atan2(sa, -t)
    const lon2 = lon+l;

    return {lat: toGrad(lat2), lon: toGrad(lon2)};
}


function toRad(value) {
    return value * Math.PI / 180;
}

function toGrad(value) {
    return value / Math.PI * 180;
}