import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async(req, res) => {
    //console.log(req.body)
    //Validacion
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if( nombre.trim() === '' ){
        errores.push({ mensaje : 'El campo nombre esta vacio'});
    }
    if( correo.trim() === '' ){
        errores.push({ mensaje : 'El campo correo esta vacio'});
    }
    if( mensaje.trim() === '' ){
        errores.push({ mensaje : 'El campo mensaje esta vacio'});
    }

    if( errores.length > 0){
        const testimoniales = await Testimonial.findAll();
        res.render('Testimoniales', {
            pagina : 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{
        //Almacenar data POSt del formulario en la BD
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }

};

export {
    guardarTestimonial
}