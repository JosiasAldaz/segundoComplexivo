insert into
    estudiantes (
    cedula,
    nombre,
    apellido,
    categoria,
    direccion,
    fecha_matricula
)
values
    (
        '1234567890',
        'Juan',
        'Pérez',
        'A',
        'Calle Falsa 123',
        '2023-01-15'
    ),
    (
        '0987654321',
        'María',
        'Gómez',
        'B',
        'Avenida Siempre Viva 742',
        '2023-02-20'
    ),
    (
        '1122334455',
        'Carlos',
        'López',
        'A',
        'Boulevard de los Sueños 456',
        '2023-03-10'
    ),
    (
        '5566778899',
        'Ana',
        'Martínez',
        'C',
        'Calle de la Amargura 789',
        '2023-04-05'
    ),
    (
        '6677889900',
        'Luis',
        'Hernández',
        'B',
        'Avenida de la Paz 101',
        '2023-05-12'
    );

insert into
    materia (materia)
values
    ('Matemáticas'),
    ('Historia'),
    ('Ciencias'),
    ('Literatura'),
    ('Arte');

insert into
    estudiante_materia (fecha_matricula, estudiante_id, materia_id)
values
    ('2023-01-15', 1, 1),
    ('2023-01-15', 1, 2),
    ('2023-02-20', 2, 3),
    ('2023-03-10', 3, 4),
    ('2023-04-05', 4, 5);