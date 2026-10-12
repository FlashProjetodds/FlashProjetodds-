package com.flash.sport.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = ElectricBlue,
    onPrimary = Color.White,
    primaryContainer = BorderLight,
    secondary = CyanGlow,
    onSecondary = DarkNavy,
    background = BackgroundWhite,
    onBackground = TextPrimary,
    surface = CardBackground,
    onSurface = TextPrimary,
    error = LiveRed
)

private val DarkColorScheme = darkColorScheme(
    primary = ElectricBlue,
    onPrimary = Color.White,
    secondary = CyanGlow,
    background = Color(0xFF061838),
    onBackground = Color.White,
    surface = Color(0xFF0B1A30),
    onSurface = Color.White
)

@Composable
fun FlashTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
