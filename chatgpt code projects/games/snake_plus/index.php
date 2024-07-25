<?php
// index.php
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multi-Game Webpage</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <?php include 'banner.php'; ?>
    </header>
    <nav>
        <?php include 'navigation.php'; ?>
    </nav>
    <main>
        <section id="snake">
            <?php include 'snake.php'; ?>
        </section>
        <section id="pong">
            <?php include 'pong.php'; ?>
        </section>
        <section id="carousel">
            <?php include 'carousel.php'; ?>
        </section>
        <section id="minesweeper">
            <?php include 'minesweeper.php'; ?>
        </section>
    </main>
    <script src="script.js"></script>
</body>
</html>