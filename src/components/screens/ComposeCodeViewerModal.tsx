import React, { useState } from 'react';
import { X, Code2, Copy, Check, FileCode, Smartphone } from 'lucide-react';

interface ComposeCodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComposeCodeViewerModal: React.FC<ComposeCodeViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<'MainActivity' | 'HomeScreen' | 'AuthScreens' | 'Theme'>('MainActivity');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const codeSnippets = {
    MainActivity: `package com.flash.sport

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.rememberNavController
import com.flash.sport.ui.navigation.FlashNavGraph
import com.flash.sport.ui.theme.FlashTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FlashTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    FlashNavGraph(navController = navController)
                }
            }
        }
    }
}`,
    HomeScreen: `package com.flash.sport.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.flash.sport.ui.theme.ElectricBlue

@Composable
fun HomeScreen(
    onNavigateToMatch: (String) -> Unit,
    onNavigateToSearch: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        // Barre de recherche
        FlashSearchBar(onClick = onNavigateToSearch)
        Spacer(modifier = Modifier.height(16.dp))

        // Carrousel de bannières sportives
        FlashBannerCarousel()
        Spacer(modifier = Modifier.height(16.dp))

        // Catégories sportives (Football, Basketball, Tennis...)
        FlashSportCategories()
        Spacer(modifier = Modifier.height(16.dp))

        // Onglets: Direct, Aujourd'hui, À venir, Terminés
        FlashMatchTabs()
        Spacer(modifier = Modifier.height(20.dp))

        // État vide intégrité des données
        FlashEmptyState(
            title = "Aucun match disponible pour le moment",
            description = "Les rencontres et cotes apparaîtront automatiquement dès la synchronisation avec le flux en direct."
        )
    }
}`,
    AuthScreens: `package com.flash.sport.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import com.flash.sport.ui.theme.ElectricBlue

@Composable
fun LoginScreen(
    onLoginClick: (String, String) -> Unit,
    onRegisterClick: () -> Unit,
    onForgotPasswordClick: () -> Unit
) {
    var identifier by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        FlashLogo(size = 48.dp)
        Spacer(modifier = Modifier.height(24.dp))

        OutlinedTextField(
            value = identifier,
            onValueChange = { identifier = it },
            label = { Text("Email ou numéro de téléphone") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp)
        )
        Spacer(modifier = Modifier.height(12.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Mot de passe") },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp)
        )
        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = { onLoginClick(identifier, password) },
            modifier = Modifier.fillMaxWidth().height(50.dp),
            colors = ButtonDefaults.buttonColors(containerColor = ElectricBlue),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text("Connexion", color = Color.White)
        }
    }
}`,
    Theme: `package com.flash.sport.ui.theme

import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color

val ElectricBlue = Color(0xFF0066FF)
val CyanGlow = Color(0xFF00D2FF)
val DarkNavy = Color(0xFF0B1A30)
val BackgroundLight = Color(0xFFFFFFFF)
val SurfaceCard = Color(0xFFF8FAFC)

val LightColorScheme = lightColorScheme(
    primary = ElectricBlue,
    secondary = CyanGlow,
    background = BackgroundLight,
    surface = SurfaceCard,
    onPrimary = Color.White,
    onBackground = DarkNavy
)`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[selectedFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-[#00D2FF] flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <span>Code Source Kotlin Jetpack Compose</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                  Android Natif
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Architecture Android native générée pour le projet FLASH
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié !' : 'Copier'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* File Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/80 border-b border-slate-800 overflow-x-auto">
          {(['MainActivity', 'HomeScreen', 'AuthScreens', 'Theme'] as const).map((file) => (
            <button
              key={file}
              onClick={() => setSelectedFile(file)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                selectedFile === file
                  ? 'bg-[#0066FF] text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file}.kt</span>
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-900 font-mono text-xs text-sky-100 leading-relaxed">
          <pre className="whitespace-pre-wrap selection:bg-blue-600">
            {codeSnippets[selectedFile]}
          </pre>
        </div>

        {/* Bottom Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-sky-400" />
            Fichiers prêts à être importés dans Android Studio
          </span>
          <span>Dossier : /android</span>
        </div>
      </div>
    </div>
  );
};
