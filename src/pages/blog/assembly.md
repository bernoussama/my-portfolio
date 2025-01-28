---
layout: ../../layouts/PostLayout.astro
title: "Assembly - Hello World"
pubDate: 2024-04-27
description: "x86 NASM Assembly - Hello World Explained"
author: "Oussama Bernou"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "The full Astro logo."
tags: ["assembly", "blogging", "learning in public", "hellow world", "tutorial"]
---

In this post, we'll take you on a step-by-step journey through a classic "Hello, World!" assembly program. We'll break down each line of code.

## Introduction

- First, let's clarify a few essential concepts. In assembly, comments are denoted by a semicolon `;`, allowing us to add explanations to our code without affecting its functionality. To display text on the screen, we'll utilize the system call `sys_write`.
  - using system call ` sys_write `

```asm
mov	edx,len     ; message length
mov	ecx,msg     ; message to write
mov	ebx,1       ; file descriptor 1 (stdout)
mov	eax,4       ; system call number 4 (sys_write)
int	0x80        ; call kernel
```

for more info: [assembly system calls](https://www.tutorialspoint.com/assembly_programming/assembly_system_calls.htm)

## The Breakdown

```asm
section	.data
    msg db "Hello, world!", 0xa  ;string to be printed
    len equ $ - msg              ;length of the string

section	.text
   global _start     ;must be declared for linker (ld)

_start:	            ;tells linker entry point
   mov	edx,len     ;message length
   mov	ecx,msg     ;message to write
   mov	ebx,1       ;file descriptor 1 (stdout)
   mov	eax,4       ;system call number (sys_write)
   int	0x80        ;call kernel

   mov	eax,1       ;system call number 1 (sys_exit)
   int	0x80        ;call kernel
```

- `section .data` − this section is where static variables are defined
  - `msg db "Hello World!", 0xA` − declaring a variable of bytes containing "hello world!" and the line feed character '0xA' or 10 in decimal and storing its address in `msg`
  - `len equ $ - msg` − getting the length of `msg` by subtracting its address from the value of the current address
- `section .text` − this section is where the program instructions are located
  - `global _start` − to declare the entry point of our program
- `_start` − tell the linker this is our entry point
  - `mov edx, len` − store `msg` length in the register `edx`
  - `mov ecx, msg` − storing the hello world string in the register `ecx`
  - `mov ebx, 1` − setting file descriptor to 1 (stdout)
  - `mov eax, 4` − setting system call 4 (sys_write)
  - `int 0x80` − calling the kernel to take action
  - `mov eax,1` − setting system call 1 (sys_exit)
  - `int 0x80` − calling the kernel again

And that's what a hello world program looks like in assembly.

## Compiling

to compile this program, two steps are needed assembling and linking:

> First, make sure you have the assembler `nasm` and the linker `ld` installed in your system.
>
> - to install nasm on Ubuntu type `sudo apt install nasm` , on other platforms check this link [assembly environment setup](https://www.tutorialspoint.com/assembly_programming/assembly_environment_setup.htm)
> - ld comes preinstalled on most operating systems

- assembling:
  - to assemble the program considering it's in a file called "hello.asm" we use the command `nasm -f elf hello.asm`
  - if no errors occured, an object file `hello.o` will be created in the same directory
- Linking:
  - to link our object file into an executable we use this command `ld -m elf_i368 -o hello hello.o`

Alternatively, you can run it online [Here](https://onecompiler.com/assembly).

Thanks for reading!

- Sources:
  - [tutorialspoint's assembly programming](https://www.tutorialspoint.com/assembly_programming)
