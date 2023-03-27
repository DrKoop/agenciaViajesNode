import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async(req, res) => {
    //Conultar la BD con multiples await CON UN PROMISE, para que ambas consultas ARRANQUEN al mismo tiempo
    const promiseDB = [];
    promiseDB.push( Viaje.findAll({ limit : 3}) );
    promiseDB.push( Testimonial.findAll({ limit : 3}) );

    try {
        
        const resultado = await Promise.all( promiseDB );

        res.render('inicio',{
            pagina : 'Inicio',
            clase : 'home',
            viajes: resultado[0],
            testimoniales: resultado[1],
        });
    } catch (error) {
        console.log(error)
    }

}

const paginaNosotros = (req, res) =>{
    res.render('nosotros',{
        pagina : 'Nosotros'
    });
}

const paginaViajes = async (req, res) =>{
    //Consultas BD
    const viajes = await Viaje.findAll();
    //console.log(viajes)

    res.render('viajes',{
        pagina : 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async(req, res) =>{
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina : 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }
}

//Link dinamico 
const paginaDetalleViaje = async (req ,res) => {
    //console.log(req.params)
    const { slug } = req.params;
    try {
        const resultado = await Viaje.findOne( { where : { slug : slug } } );
        //Pasando el resultado de la consulta hacia su vista
        res.render('viaje', {
            pagina : 'Información Viaje',
            resultado
        });
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}