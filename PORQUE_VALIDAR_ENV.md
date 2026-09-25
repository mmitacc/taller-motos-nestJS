### ¿Por qué validar la configuración al arrancar es mejor que fallar en tiempo de ejecución?

Por varios motivos:

- Gobernabilidad en las variables de entorno; saber que, cuantos, y como se acceden nuestras variables de entorno nos asegura un control adecuado sobre estos datos sensibles.
- Validar antes de que corra el py, nos asegura que todas las variables de entorno cumplen con sus parametros y tipos.
- Evitar comportamientos incoherentes en la aplicación online, cuando alguna variable este faltando o tiene un dato equivocado.
- Tener un mecanismo de alerta si alguna variable ha sido modificada sin autorización. Prevención contra hackers.
