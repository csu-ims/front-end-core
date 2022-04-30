class Core {

    host: string | null = null;

    static singleton: Core = new Core();
    static use(){
        return this.singleton;
    }
}

export { Core }