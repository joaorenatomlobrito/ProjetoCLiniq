package com.Cliniq.projeto.Model.exception;

public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
    public  ConflictException(String mensagem, Throwable throwable){
        super(mensagem);
    }
}
