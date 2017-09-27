package poo;

/**
 *
 * @author Juan Morón
 */
public class Pelota {
//Variables nativas de la clase
    
    String marca;
    float peso;
    float radio;
    boolean patear = false;
    boolean agarrar = false;
    
//Constructores  
    public Pelota(){
        
        radio = 100;
        peso = 250;
    }
    public Pelota(float radio,float peso){
        
        //"this" se utilza para llamar variables nativas de la clase y 
        //la variables "radio" y "peso" que tiene el constructor
        //son solo del constructor ;3
        this.radio=radio;
        this.peso=peso;
    }
//Termina constructores

//Metodos
    public float obtenerRadio(){
        
        return this.radio;
    }
    
    public float obtenerPeso(){
        
        return this.peso;
    }
    
    public void patearPelota(){
        this.patear = true;
        System.out.println("Haz Pateado la Pelota!");
    }
    
    public void agarrarPelota(){
        this.agarrar = true;
        System.out.println("Haz agarrado la Pelota!----ay valee!!");
    }
    
    public void dondeEstalaPelota(){
       if( (this.patear == true) && (this.agarrar == false) )
           System.out.println("LA pelota esta lejos porque la pateaste");
       else if( (this.patear == false) && (this.agarrar == true) )
           System.out.println("LA pelota esta e tu mano porque la agarraste");
       else if( (this.patear == false) && (this.agarrar == false) )
           System.out.println("La pelota esta en el piso");
       else if( (this.patear == true) && (this.agarrar == true) )
           System.out.println("Verga ni idea de donde esta esa vaina!");
    }
    
    
}
/*IMPORTANTE: Para crear otra clase que herede..se tiene que crear dabajo de las llaves
  "{}" de la que le va a heredar
*/

//Herencia
    class PelotaTama extends Pelota{
        
        public PelotaTama(){
            this.marca = "Tamanaco";
        }
        public void inflar(){
            System.out.println("Acabas de inflar la pelota");
        }
        
    }
