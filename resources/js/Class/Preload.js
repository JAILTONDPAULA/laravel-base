class Preload {
    static show() {
        $('body').css('overflow', 'hidden');
        $('.preload').css('display', 'flex');
    }

    static hide() {
        $('.preload').css('display', 'none');
        $('body').css('overflow', 'auto');
    }
}
